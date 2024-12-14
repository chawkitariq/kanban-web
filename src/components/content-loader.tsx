import { Loader2 } from 'lucide-react'

interface Props {
  children: React.ReactNode
  loading: boolean
}

export function ContentLoader({ loading, children }: Props) {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </>
  )
}
