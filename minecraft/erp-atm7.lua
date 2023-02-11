
reqUrl = "https://34.125.4.241/" -- Node.js server has to be hosted somewhere, an IP address will not work here
reqBod = 5 -- numbers will be returned as a factorial
-- reqBod = "test" -- strings will be returned encoded as base64


local function sendReq(url, body)
    print("setting up...")

    if body then
        http.request(url, tostring(body))
    else
        http.request(url)
    end


    while true do
        local event, url, hBody = os.pullEvent()

        if event == "http_success" then
            print("HTTP success")
            return hBody
        elseif event == "http_failure" then
            print("HTTP error")
            return nil
        end
    end
end


local function run()
    local hBody = sendReq(reqUrl, reqBod)

    if hBody then
        local body = hBody.readAll()
        print(body)
    end
end


run()