namespace RegistrationPage

open WebSharper
open WebSharper.JavaScript

module Server =
    
    type LoginInfo =
        {
            Username: string
            Password: string
        }

    let UserList = []

    let ValidUsername = "user"
    let ValidPassword = "pass"

    [<Rpc>]
    let Logout () =
        let ctx = Web.Remoting.GetContext()
        async {
            do! ctx.UserSession.Logout()
        }
    
    [<Rpc>]
    let Login (logindata:LoginInfo) =
        let ctx = Web.Remoting.GetContext()
        async{
            if logindata.Username = ValidUsername && logindata.Password = ValidPassword then
                do! ctx.UserSession.LoginUser(logindata.Username, true)
                return Some()
            else
                return None
        }
    
    [<Rpc>]
    let Register (regdata:LoginInfo) =
        let ctx = Web.Remoting.GetContext()
        async{
            return()
        }
//        async{
            //check if username unique
            //if unique add to db
//        }
