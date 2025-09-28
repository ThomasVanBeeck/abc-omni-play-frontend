export interface NewsResponse {
  result: NewsItem[];
  totalItems: number;
}

export interface NewsItemDetails extends NewsItem {
  title: string;
  intro: string;
  content: string;
  imageUrl: string;
  flickrAlbumId: number;
  itemUrl: string;
  commentCount: number;
}

export interface NewsItem {
  intro: string;
  itemUrl: string;
  item: ItemDetails;
  title: string;
  imageUrl: string;
  commentCount: number;
  photoCommentCount: number;
}

export interface ItemDetails {
  primaryAudienceTag: Tag;
  newsTypeTag: Tag;
  author: Author;
  tags: Tag[];
  newsItemId: number;
  umbracoContentId: number;
  primaryAudienceTagId: number;
  newsTypeTagId: number;
  releaseOn: string;
  expireOn: string;
  published: boolean;
  lastModifiedOn: string;
  stickyUntil: string;
  authorUserId: number;
  views: number;
  updated: boolean;
  flickrAlbumId: number;
}

export interface Tag {
  tagType: TagType;
  tagId: number;
  name: string;
  tagTypeId: number;
  usages: number;
}

export interface TagType {
  tagTypeId: number;
  type: string;
  color: string;
}

export interface Author {
  userId: number;
  username: string;
  audienceTagId: number;
  umbracoUserId: number;
  firstName: string;
  lastName: string;
}
