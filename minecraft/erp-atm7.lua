reqUrl = "http://34.155.134.81:1337/" -- Node.js server has to be hosted somewhere, an IP address will not work here
 
--Energy
 
mekanism_cell_0 = peripheral.wrap("inductionPort_0")
 
local function get_energy_stored()
 
    Energy = mekanism_cell_0.getEnergy()
    
    return Energy
    
end
 
--Json
 
reqBod = textutils.serialise({get_energy_stored()})



 
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
    while true do
        local hBody = sendReq(reqUrl, reqBod)
 
            if hBody then
                local body = hBody.readAll()
                print(body)
            end
    end
end
 
run()