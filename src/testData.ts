export interface ImageProps {
  _id?: string
  url?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar: ImageProps
  description: string
}

export interface PostProps {
  _id: string
  title: string
  excerpt: string
  content?: string
  image: ImageProps
  createdAt: string
  column: string
}
