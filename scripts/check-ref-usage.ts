import * as fs from "node:fs";
import * as path from "node:path";

function checkFile(filePath: string): {
  hasRefDestructure: boolean;
  hasRefProp: boolean;
} {
  const content = fs.readFileSync(filePath, "utf-8");

  // ref를 destructure하는지 확인
  const hasRefDestructure = /const\s*{[^}]*\bref\b[^}]*}\s*=\s*use/.test(
    content
  );

  // ref prop을 전달하는지 확인
  const hasRefProp = /\bref={ref}|\bref\s*=\s*{?\s*ref\s*}?/.test(content);

  return { hasRefDestructure, hasRefProp };
}

function walkDir(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules") {
        walkDir(filePath, callback);
      }
    } else if (file.endsWith(".tsx")) {
      callback(filePath);
    }
  }
}

const componentsDir = path.join(process.cwd(), "src/components");
const missingRefProp: string[] = [];

walkDir(componentsDir, (filePath) => {
  const { hasRefDestructure, hasRefProp } = checkFile(filePath);

  if (hasRefDestructure && !hasRefProp) {
    missingRefProp.push(filePath.replace(process.cwd(), ""));
  }
});

console.log("🔍 ref를 받지만 전달하지 않는 컴포넌트:\n");
missingRefProp.forEach((file) => console.log(`  ❌ ${file}`));
console.log(`\n📊 Total: ${missingRefProp.length} files`);
