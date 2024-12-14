import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from './ui/button'

interface Props extends ButtonProps {
  loading?: boolean
}

export const ButtonLoading = ({
  loading = false,
  children,
  ...props
}: Props) => {
  return (
    <Button {...props}>
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  )
}
