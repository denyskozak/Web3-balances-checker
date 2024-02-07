/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly INFURA_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}