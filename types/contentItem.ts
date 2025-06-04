export type ContentItem = {
    id: string
    title: string
    body: Record<string, unknown>
    description: string
    extension: string
    meta: {
        tags: string[]
        author: string
        github: string
    }
    navigation: boolean
    path: string
    seo: {
        title: string
        description: string
    }
    stem: string
    __hash__: string
}