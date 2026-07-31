import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, ShoppingBag } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import { useCart } from '../context/CartContext';


const Tab = createBottomTabNavigator();

export type MainTabParamList = {
    Home: undefined;
    Cart: undefined;
};

export default function TabNavigator() {
    const { totalItems } = useCart();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#050505',
                tabBarInactiveTintColor: '#9E9E9E',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <House
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarBadge:
                        totalItems > 0
                            ? totalItems
                            : undefined,
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingBag
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}