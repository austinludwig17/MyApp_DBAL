import { View, StyleSheet, Image } from 'react-native';
import styles from './styles/styles';


export default function UserIcon(props) {
    return (
            <View style={{...styles.iconContainer}}>
                <Image source={{uri:'https://tse4.mm.bing.net/th?id=OIP.0nN7m_td3QW2iyl7lXfL0gHaGc&pid=Api&P=0&h=220?'}} style={{...styles.iconImage, height: props.containerSize, width: props.containerSize}}/>
            </View>
    )
}


