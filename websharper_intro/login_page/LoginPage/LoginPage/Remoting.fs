namespace LoginPage

open WebSharper
open WebSharper.JavaScript

module Server =
    
    type LoginInfo =
        {
            Username: string
            Password: string
        }

    let ValidUsername = "Username123"
    let ValidPassword = "P455W0RD"
    
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