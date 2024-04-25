import React, {FC} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {Alert, Button, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

type MainStackParamList = {
  BottomTabApp: undefined;
  FullScreen: undefined;
};

const mainNavigationRef = createNavigationContainerRef<MainStackParamList>();

type DashboardStackParamList = {
  Dashboard: undefined;
};

type CreateInvoiceStackParamList = {
  CreateInvoice: undefined;
};

type ContactsStackParamList = {
  Contacts: undefined;
  ContactsSelect: {onPress: () => void};
  ContactsDetails: undefined;
};

type MoreStackParamList = {
  More: undefined;
};

type StackParamList = DashboardStackParamList &
  CreateInvoiceStackParamList &
  ContactsStackParamList &
  MoreStackParamList;

const Stack = createNativeStackNavigator<StackParamList>();

type DashboardProps = NativeStackScreenProps<StackParamList, 'Dashboard'>;
const Dashboard: FC<DashboardProps> = ({navigation: {push}}) => {
  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="Go to Contacts" onPress={() => push('Contacts')} />
      <Button title="Go to More" onPress={() => push('More')} />
      <Button title="CreateInvoice" onPress={() => push('CreateInvoice')} />
      <Button
        title="Go to Select a Contact"
        onPress={() =>
          push('ContactsSelect', {onPress: () => console.log('HOLA')})
        }
      />
      <Button
        title="Open FullScreen"
        onPress={() => mainNavigationRef?.navigate('FullScreen')}
      />
    </View>
  );
};

type CreateInvoiceProps = NativeStackScreenProps<
  StackParamList,
  'CreateInvoice'
>;
const CreateInvoice: FC<CreateInvoiceProps> = ({navigation: {push}}) => {
  return (
    <View>
      <Text>Create Invoice</Text>
      <Button
        title="Select a Contact"
        onPress={() =>
          push('ContactsSelect', {
            onPress: () => Alert.alert('I am your father'),
          })
        }
      />
    </View>
  );
};

type ContactsProps = NativeStackScreenProps<StackParamList, 'Contacts'>;
const Contacts: FC<ContactsProps> = ({navigation: {push}}) => {
  return (
    <View>
      <Text>Contacts</Text>
      <Button
        title="Go to Contact Detail"
        onPress={() => push('ContactsDetails')}
      />
    </View>
  );
};

type ContactsSelectProps = NativeStackScreenProps<
  StackParamList,
  'ContactsSelect'
>;
const ContactsSelect: FC<ContactsSelectProps> = ({
  navigation: {pop},
  route: {params},
}) => {
  console.log(params);

  return (
    <View>
      <Text>Select a contact</Text>
      <Button
        title="Contact you want to select"
        onPress={() => {
          pop();
          params.onPress();
        }}
      />
    </View>
  );
};

type ContactsDetailsProps = NativeStackScreenProps<
  StackParamList,
  'ContactsDetails'
>;
const ContactsDetails: FC<ContactsDetailsProps> = ({navigation: {push}}) => {
  return (
    <View>
      <Text>ContactsDetails</Text>
      <Button
        title="Go to Contact other Contact Detail"
        onPress={() => push('ContactsDetails')}
      />
    </View>
  );
};

type MoreProps = NativeStackScreenProps<StackParamList, 'More'>;
const More: FC<MoreProps> = ({navigation: {push}}) => {
  return (
    <View>
      <Text>More</Text>
      <Button title="Go to Contacts" onPress={() => push('Contacts')} />
      <Button title="Go to Dashboard" onPress={() => push('Dashboard')} />
    </View>
  );
};

const SharedStack = ({
  initialRouteName,
}: {
  initialRouteName: keyof StackParamList;
}) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="ContactsSelect" component={ContactsSelect} />
      <Stack.Screen name="ContactsDetails" component={ContactsDetails} />
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
};

const Tab1 = () => {
  return <SharedStack initialRouteName="Dashboard" />;
};

const Tab2 = () => {
  return <SharedStack initialRouteName="Contacts" />;
};

const Tab3 = () => {
  return <SharedStack initialRouteName="More" />;
};

const BottomTab = createBottomTabNavigator();

const BottomTabApp = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Tab1" component={Tab1} />
      <BottomTab.Screen name="Tab2" component={Tab2} />
      <BottomTab.Screen name="Tab3" component={Tab3} />
    </BottomTab.Navigator>
  );
};

const FullScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#ccc'}}>
      <Text>FullScreen</Text>
    </View>
  );
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

export default function App() {
  return (
    <NavigationContainer ref={mainNavigationRef}>
      <MainStack.Navigator>
        <MainStack.Screen name="BottomTabApp" component={BottomTabApp} />
        <MainStack.Screen
          name="FullScreen"
          component={FullScreen}
          options={{presentation: 'modal'}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
