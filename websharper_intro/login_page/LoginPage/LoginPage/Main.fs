namespace LoginPage

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI.Next
open WebSharper.UI.Next.Server

type EndPoint =
    | [<EndPoint "/">] Home

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
            
            div [client <@ Client.Main uname @>]
        ]

    [<Website>]
    let Main =
        Application.MultiPage (fun (ctx:Context<EndPoint>) endpoint ->
            async{
                let! uname = ctx.UserSession.GetLoggedInUser()
                match endpoint with
                | EndPoint.Home -> return! (HomePage ctx uname)
            }
        )
