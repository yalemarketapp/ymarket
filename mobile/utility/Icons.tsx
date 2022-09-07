import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={25} style={{ marginBottom: -5 }} {...props} />
}
