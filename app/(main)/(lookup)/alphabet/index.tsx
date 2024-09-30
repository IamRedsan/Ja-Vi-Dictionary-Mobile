import Button from '@/components/ui/Button'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
const Alphabet = () => {
  return (
    <View>
      <Text>Alphabet</Text>
      <Link href='/login' asChild>
        <Button>Hello</Button>
      </Link>
    </View>
  )
}
export default Alphabet