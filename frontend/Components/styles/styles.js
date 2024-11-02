import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    headerText: {
        fontSize: 26,
        marginBottom: 20,
        textAlign: 'center',
        marginTop: '3%',
        fontWeight: 'bold'
    },
    input: {
      height: 40,
      width:'80%',
      borderColor: 'black',
      borderWidth: 1,
      margin: 'auto',
      marginBottom: 12,
      paddingLeft: 8,
    },
    buttonContainer: {
        marginVertical: 10,
        alignSelf: 'center',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '0%',
        
    },
    button: {
        padding: '1%',
        width: '50.3%', // 75% of the width
    },
    message: {
        padding: '1%',
        textAlign: 'center',
    },
    footerContainer: {
        padding: '0.5%',
        flexDirection: 'row', 
        marginBottom: 0,
        backgroundColor: 'cyan',
        position: 'absolute', bottom: 0, left: 0, right: 0,
        justifyContent: 'center',
    },
    AccountHeader: {
        position: 'absolute', top: 0, left: 0, right: 0, 
        textAlign: 'center',
        backgroundColor: 'cyan',
        zIndex: 1000, /* Ensure it's on top of other elements */
    },
    iconContainer: {
        borderWidth: 2,
        borderRadius: 999,
        aspectRatio: 1/1,
    },
    iconImage: {
        borderRadius: 999,
        aspectRatio: 1/1,
    },
    entryText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: '10%'
    }
  });

  