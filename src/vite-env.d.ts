/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_INFURA_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}