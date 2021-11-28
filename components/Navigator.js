import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from "react-navigation";

// import Splash from "../screens/Splash";
// import Welcome from "../screens/login/Welcome";
import CreateAccount from "../screens/login/CreateAccount";
import EnterPhone from "../screens/login/EnterPhone";
import Otp from "../screens/login/Otp";
import Login from "../screens/login/Login";
import MainScreen from "../screens/MainScreens";
import L_Navigator from "../screens/landlord/L_Navigator";
import L_Listing from "../screens/landlord/L_Listing";
import AgentAccount from "../screens/login/AgentAccount";
import A_Navigator from "../screens/agent/A_Navigator";

const Navigator = createStackNavigator({
    mainScreen :MainScreen,
    login:Login,
    createAccount:CreateAccount,
    phone:EnterPhone,
    otp:Otp,
    l_navigator : L_Navigator,
    l_listing : L_Listing,
    agentAccount: AgentAccount,
    a_navigator: A_Navigator,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: true,
  },
  defaultNavigationOptions: () => ({
    cardStyle: {
        backgroundColor: "white",
    },
}),
 });

export default createAppContainer(Navigator);