reqUrl = "http://34.163.212.35:1337/" -- Node.js server has to be hosted somewhere, an IP address will not work here
 
--Energy
 
mc_1 = peripheral.wrap("inductionPort_1")
 
function get_energy(meka_cell)
    Energy = meka_cell.getEnergy()
    
    return Energy
end
 
function get_max_energy(meka_cell)
    max_energy = meka_cell.getMaxEnergy()
    
    return max_energy
    
end
 
    
 
 
--json
 
reqBod = textutils.serialiseJSON({Energy = get_energy(mc_1),Max_energy = get_max_energy(mc_1) })
 
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
