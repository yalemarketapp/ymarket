import { FC } from 'react'
import { ViewProps, StyleSheet } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

const SafeAreaView: FC<ViewProps> = ({ children, ...props }) => {
  return (
    <RNSafeAreaView {...props} style={[styles.view, props.style]}>
      {children}
    </RNSafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: 'white' },
})

export default SafeAreaView
