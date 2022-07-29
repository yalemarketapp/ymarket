import { FC } from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

const SafeAreaView: FC = ({ children }) => {
  return <RNSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>{children}</RNSafeAreaView>
}

export default SafeAreaView
