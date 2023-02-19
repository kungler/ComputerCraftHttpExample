reqUrl = "http://34.163.212.35:1337/"
 
 
-- Energy
 
mc_1 = peripheral.wrap("inductionPort_1")
 
function get_energy(meka_cell)
    Energy = meka_cell.getEnergy()
 
    return Energy
end
 
function get_max_energy(meka_cell)
    max_energy = meka_cell.getMaxEnergy()
 
    return max_energy
 
end
 
-- json
 
function get_json_body()
    return textutils.serialiseJSON({ Energy = get_energy(mc_1), Max_energy = get_max_energy(mc_1) })
end
 
local function sendReq(url, body)
    print("Setting up...")
    
 
    http.post(url,tostring(body))
        if response then
            print("HTTP success")
            local response_body = response.readAll()
            print(response_body)
        else
            print("HTTP error")
        end
end
 
local function run()
    while true do
        local json_body = get_json_body()
        sendReq(reqUrl, json_body)
        sleep(5) -- wait 5 seconds before sending another request
    end
end
 
run()