import React, { PropsWithChildren } from "react"

interface LoaderProps extends PropsWithChildren {
  loading: boolean
}

export function Loader({ loading, children }: LoaderProps) {
  if (loading) {
    return <div>Loading...</div>
  }
  return children
}
