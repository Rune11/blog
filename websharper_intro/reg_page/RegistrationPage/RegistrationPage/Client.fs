namespace RegistrationPage

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
module Client =
    
    type LoginTemplate = Templating.Template<"./login.html">
    type RegistrationTemplate = Templating.Template<"./registration.html">
    
    let login(uname: IRef<string>)(passwd: IRef<string>) _ _ =
        async{
            let! un = View.GetAsync uname.View
            let! pw = View.GetAsync passwd.View
            let li =
                {
                    Username = un
                    Password = pw
                }:Server.LoginInfo
            let! login = Server.Login li
            match login with
            | None -> JS.Alert("Invalid login data")
            | Some u -> JS.Alert("Succesfully logged in");JS.Window.Location.Reload()
            return()
        }
        |> Async.Start

    let Main (uname: string option) =
        let rvUname = Var.Create ""
        let rvPassword = Var.Create ""
 //       let loggedin = defaultArg uname ""

        let title =
            match uname with
            | Some u -> h1 [text ("Welcome " + u + "!")]
            | None -> h1 [text "Login"]
        let content =
            match uname with
            | Some _ -> Doc.Button "Logout" [] (fun _  -> 
                async {
                    do! Server.Logout()
                    JS.Window.Location.Reload()
                } |> Async.Start)
            | None -> 
                LoginTemplate.Login()
                //       .LoggedIn(loggedin)
                    .UName(rvUname)
                    .Password(rvPassword)
                    .SignIn(login rvUname rvPassword)
                    .Elt()
        Doc.Concat[
            title
            content
        ]
    
    let Signup (uname: IRef<string>)(pw1: IRef<string>)(pw2: IRef<string>) _ _ =
        async{
            let! un = View.GetAsync uname.View
            let! p1 = View.GetAsync pw1.View
            let! p2 = View.GetAsync pw2.View

            if p1 = p2 then
                let ri =
                    {
                        Username = un
                        Password = p1
                    }:Server.LoginInfo
                let! response = Server.Register ri
                ()//do stuff with the server response
            else
                JS.Alert("The two passwords must be the same!")

            return()
        }|> Async.Start

    let RegPage() =
        let rvUname = Var.Create ""
        let rvPw1 = Var.Create ""
        let rvPw2 = Var.Create ""
        let content =
            RegistrationTemplate.Registration()
                .UName(rvUname)
                .Password1(rvPw1)
                .Password2(rvPw2)
                .SignUp(Signup rvUname rvPw1 rvPw2)
                .Doc()
        Doc.Concat[
            h1[text "Registration"]
            content
        ]