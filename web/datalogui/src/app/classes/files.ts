export class ContentFile {
    constructor(name: string, content: string) {
        this.name = name
        this.content = content
    }
    name: string
    content?: string
    shortName(): string {
        let a = (this.name || '').replace('\\', '/').split('/')
        return a[a.length - 1]
    }
}