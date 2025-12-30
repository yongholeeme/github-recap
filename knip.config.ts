import type {KnipConfig} from 'knip'

export default {
    /**
     * unused files = project files - (entry files + resolved files)
     * @see https://knip.dev/guides/configuring-project-files#unused-files
     */
    entry: ['src/main.tsx', 'src/routes/**/*.{js,ts,tsx}'],
    project: ['src/**/*.{js,jsx,ts,tsx,css}'],
    ignoreDependencies: ['@naverpay/editorconfig', 'babel-plugin-react-compiler'],
    ignoreBinaries: [],
    ignore: ['src/routeTree.gen.ts'],
    /**
     * @see https://knip.dev/features/compilers
     */
    compilers: {
        css: (source: string) => [...source.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
    },
} satisfies KnipConfig
