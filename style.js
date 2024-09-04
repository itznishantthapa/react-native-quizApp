import { StyleSheet } from "react-native";

export const  styles = StyleSheet.create({
    //styles for Login
    root: {
        flex: 1,
      

    },
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#000000'
    },
    innerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    inputField: {
        width: '80%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#adb5bd',
        paddingLeft: 10,
        color: '#adb5bd',
        fontWeight: 'bold',
    },
    login: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
    },
    loginOptions: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        height: 130,
        width: '60%',
    },
    loginOpt: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    background_Dashboard: {
        flex: 1,
        backgroundColor: '#000000',
        gap: 40

    },
    searchView: {
        height: 60,
        width: '90%',
        backgroundColor: '#f0efeb',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,

    },
    boxContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 40
    },
    boxes: {
        height: 150,
        width: '90%',
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

    },
    textStyle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 15,
        marginBottom: 15
    },
    textStyle2: {
        color: 'white',
        fontWeight: '900',
        fontSize: 25,
        marginLeft: 15,
        marginBottom: 15
    },
    container: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        width:'100%'
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        paddingHorizontal: 20,
        color: '#edf6f9',
        fontWeight: 'bold'
    },
    optionsContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },
    optionButton: {
        backgroundColor: "#cccccc",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    optionText: {
        color: "black",
        fontSize: 18,
        fontWeight:'bold'
    },

    //setting css
    settingBox: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    accountBox: {
        height: '50%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    accountBoxSections: {

        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8, alignItems: 'center',
        width: '80%',
        borderBottomWidth: 1,
        borderColor: 'white',
        height: 60
    },
    sectionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'

    },

    //added css
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      cancelButton: {
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
        marginRight: 10,
      },
      deleteButton: {
        padding: 10,
        backgroundColor: '#ff4444',
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      openButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
      },

});
