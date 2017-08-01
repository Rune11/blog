namespace RegistrationPage

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI.Next
open WebSharper.UI.Next.Server

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/registration">] Registration

module Templating =
    open WebSharper.UI.Next.Html

    type MainTemplate = Templating.Template<"Main.html">

    // Compute a menubar where the menu item for the given endpoint is active
    let MenuBar (ctx: Context<EndPoint>) endpoint : Doc list =
        let ( => ) txt act =
             liAttr [if endpoint = act then yield attr.``class`` "active"] [
                aAttr [attr.href (ctx.Link act)] [text txt]
             ]
        [
            li ["Home" => EndPoint.Home]
            li ["Registration" => EndPoint.Registration]
        ]

    let Main ctx action (title: string) (body: Doc list) =
        Content.Page(
            MainTemplate()
                .Title(title)
                .MenuBar(MenuBar ctx action)
                .Body(body)
                .Doc()
        )

module Site =
    open WebSharper.UI.Next.Html
    open WebSharper.UI.Next.Client

    let HomePage (ctx:Context<EndPoint>) uname =

        Templating.Main ctx EndPoint.Home "Home" [
            
            client <@ Client.Main uname @>
        ]
    
    let RegistartionPage ctx =
        Templating.Main ctx EndPoint.Registration "Registration" [
            client <@ Client.RegPage() @>
        ]

    [<Website>]
    let Main =
        Application.MultiPage (fun (ctx:Context<EndPoint>) endpoint ->
            async{
                let! uname = ctx.UserSession.GetLoggedInUser()
                match endpoint with
                | EndPoint.Home -> return! (HomePage ctx uname)
                | EndPoint.Registration -> return! (RegistartionPage ctx)
            }
        )
