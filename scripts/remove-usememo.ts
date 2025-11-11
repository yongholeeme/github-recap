import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function getAllTsFiles(dir: string, files: string[] = []): string[] {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) {
      getAllTsFiles(fullPath, files);
    } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getAllTsFiles("src");

let totalUpdated = 0;

for (const filePath of files) {
  let content = readFileSync(filePath, "utf-8");
  const original = content;

  // useMemo import 제거
  content = content.replace(
    /import\s+{\s*useMemo\s*}\s+from\s+["']react["'];?\n/g,
    ""
  );

  // useMemo와 함께 다른 것들도 import하는 경우
  content = content.replace(
    /import\s+{\s*([^}]*),\s*useMemo\s*([^}]*)\s*}\s+from\s+["']react["'];/g,
    'import { $1$2 } from "react";'
  );
  content = content.replace(
    /import\s+{\s*useMemo\s*,\s*([^}]*)\s*}\s+from\s+["']react["'];/g,
    'import { $1 } from "react";'
  );

  // useCallback import 제거
  content = content.replace(
    /import\s+{\s*useCallback\s*}\s+from\s+["']react[""];?\n/g,
    ""
  );
  content = content.replace(
    /import\s+{\s*([^}]*),\s*useCallback\s*([^}]*)\s*}\s+from\s+["']react["'];/g,
    'import { $1$2 } from "react";'
  );
  content = content.replace(
    /import\s+{\s*useCallback\s*,\s*([^}]*)\s*}\s+from\s+["']react["'];/g,
    'import { $1 } from "react";'
  );

  // 빈 import 제거
  content = content.replace(/import\s+{\s*}\s+from\s+["']react["'];?\n/g, "");

  // useMemo 사용 패턴 변경
  // const data = useMemo(() => { ... }, [deps]); -> const data = ...;
  content = content.replace(
    /const\s+(\w+)\s*=\s*useMemo\(\s*\(\)\s*=>\s*\{\s*\n\s*if\s*\(!(\w+)\)\s*return\s+undefined;\s*\n\s*return\s+(\w+)\((\w+)\);\s*\n\s*\},\s*\[(\w+)\]\);/g,
    "const $1 = $2 ? $3($4) : undefined;"
  );

  // 더 복잡한 useMemo 패턴들
  content = content.replace(
    /const\s+(\w+)\s*=\s*useMemo\(\s*\(\)\s*=>\s*\{([^}]+)\},\s*\[[^\]]*\]\);/gs,
    (match, varName, body) => {
      // 간단한 return 문만 있는 경우
      const simpleReturn = body.match(/^\s*return\s+([^;]+);\s*$/);
      if (simpleReturn) {
        return `const ${varName} = ${simpleReturn[1].trim()};`;
      }
      // if/return 패턴
      const ifReturn = body.match(
        /^\s*if\s*\(([^)]+)\)\s*return\s+([^;]+);\s*return\s+([^;]+);\s*$/
      );
      if (ifReturn) {
        return `const ${varName} = ${ifReturn[1].trim()} ? ${ifReturn[2].trim()} : ${ifReturn[3].trim()};`;
      }
      return match; // 복잡한 경우는 그대로 유지
    }
  );

  // useCallback 제거
  content = content.replace(
    /const\s+(\w+)\s*=\s*useCallback\(\s*([^,]+),\s*\[[^\]]*\]\);/gs,
    "const $1 = $2;"
  );

  if (content !== original) {
    writeFileSync(filePath, content, "utf-8");
    console.log(`✓ ${filePath}`);
    totalUpdated++;
  }
}

console.log(`\n✅ Updated ${totalUpdated} files`);
