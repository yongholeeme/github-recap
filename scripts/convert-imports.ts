import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const SRC_DIR = "./src";

// TypeScript 파일인지 확인
function isTypeScriptFile(filename: string): boolean {
  return filename.endsWith(".ts") || filename.endsWith(".tsx");
}

// 디렉토리를 재귀적으로 탐색
function getAllFiles(dir: string, files: string[] = []): string[] {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (isTypeScriptFile(item)) {
      files.push(fullPath);
    }
  }

  return files;
}

// 상대 경로를 @ alias로 변환
function convertRelativeToAlias(
  importPath: string,
  currentFilePath: string
): string {
  // 이미 @ alias거나 외부 패키지면 변환하지 않음
  if (!importPath.startsWith(".")) {
    return importPath;
  }

  // 현재 파일의 디렉토리
  const currentDir = currentFilePath.substring(
    0,
    currentFilePath.lastIndexOf("/")
  );

  // 상대 경로를 절대 경로로 변환
  const targetPath = join(currentDir, importPath);

  // ./src 기준 상대 경로로 변환
  const srcRelativePath = relative(SRC_DIR, targetPath);

  // @ alias 적용
  return `@/${srcRelativePath}`;
}

// 파일 내용 변환
function transformFile(filePath: string): void {
  let content = readFileSync(filePath, "utf-8");
  let hasChanges = false;

  // import 문 찾기 (from '...' 또는 from "...")
  const importRegex = /from\s+['"](\.[^'"]+)['"]/g;

  content = content.replace(importRegex, (match, importPath) => {
    const newPath = convertRelativeToAlias(importPath, filePath);
    if (newPath !== importPath) {
      hasChanges = true;
      return `from '${newPath}'`;
    }
    return match;
  });

  if (hasChanges) {
    writeFileSync(filePath, content, "utf-8");
    console.log(`✓ ${relative(process.cwd(), filePath)}`);
  }
}

// 메인 실행
function main() {
  console.log("🔄 Converting relative imports to @ alias...\n");

  const files = getAllFiles(SRC_DIR);

  for (const file of files) {
    transformFile(file);
  }

  console.log(`\n✅ Done! Processed ${files.length} files.`);
}

main();
