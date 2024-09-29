import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onTextChange = (key: 'email' | 'password', value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <View>
      <Text>Chao mung tro lai!</Text>
      <View>
        <FormRow
          label='Email'
          errMsg=''
          placeHolder='name@email.com'
          text={values.email}
          onChangeText={(value) => onTextChange('email', value)}
        />
        <FormRow
          label='Mat khau'
          errMsg=''
          placeHolder='********'
          text={values.password}
          onChangeText={(value) => onTextChange('password', value)}
        />
        <View>
          <TouchableOpacity>
            <Text>Ghi nho toi</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Quen mat khau</Text>
          </TouchableOpacity>
        </View>
        <Button>Dang nhap</Button>
      </View>
      <Text>
        Chua co tai khoan?
        <TouchableOpacity>
          <Text> Dang ky ngay</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};
export default Login;
