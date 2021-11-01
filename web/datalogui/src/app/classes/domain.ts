export class Link {  
    linkType?: string
    dataset?: string
    domainProject?: string
    domainItem?: string
}
export class DomainProjectLinks {
  name?: string
  domainLinks?: Link[]
  error?: string
}

export class DomainProjectLinksSearchResult {
  docs?: DomainProjectLinks[]
}