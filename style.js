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
    //restart button css

    
    outlineButton: {
        borderColor: '#ffffff', // White outline
        borderWidth: 2, // Thickness of the outline
        borderRadius: 8, // Rounded corners
        paddingVertical: 10, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        alignItems: 'center', // Center the text inside the button
    },
    outlineButtonText: {
        color: '#ffffff', // White text
        fontSize: 16, // Font size for the text
        fontWeight: 'bold', // Make the text bold
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
      
    //   AccountDeletion css
      deleteContainer:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        gap:30
    },
    deleteInfoBox:{
      height:'30%',
      width:'80%',
      backgroundColor:'white',
      borderRadius:10,
      padding:15,
      flexDirection:'column',
      justifyContent:'flex-start',
      gap:20
      
    },
    infoPoints:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        gap:10
    },
    infoPointContainer:{
        gap:10
    },


    //profile css
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
        top: '13%',
        width: '100%',
        // backgroundColor:'grey'
      },
      profieText_gear_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        // backgroundColor: 'grey',
        height: '20%',
        width: '100%'
    
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Half of the width/height to make it circularrr 
        borderWidth: 2, // Optional: adds a border around the image
        borderColor: '#000', // Optional: border color
      },
      profileText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        // marginLeft: 10
    
    
      },
      gameInfo: {
        height: '40%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
      },
      gameInfoIcons: {
        height: '45%',
        width: '30%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // borderColor: 'grey',
        // borderWidth: 2,
        backgroundColor: 'white'
      },
      iconsNameContainer: {
        backgroundColor: '#dee2e6',
        height: '80%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'column'
      },
      name_usernameContainer: {
    
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
      },
    
      iconImage: {
        height: '30%',
        // width: '100%',
        width: '30%',
        objectFit: 'contain'
    
      },
      friendBox: {
        // borderWidth: 1,
        // borderColor: 'black',
        width: '80%',
        height: 80,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: '#ced4da'
      },
      friendImage: {
        width: 70,
        height: 70,
        borderRadius: 50, // Half of the width/height to make it circular
        // borderWidth: 2, // Optional: adds a border around the image
        // borderColor: '#000',
      },
      friendRank: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      friendUsername: {
        fontSize: 15,
        fontWeight: 'bold'
      }
    

});
