import { Router } from "express";

let { GITHUB_BASE_URI, GITHUB_OWNER, GITHUB_JSON_REPO } = process.env;
let baseUri = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_JSON_REPO}/contents/`;

const router = Router();

router.get("/:resource", async (req, res) => {
    let { resource } = req.params;
    let endpoint = `${baseUri}${resource}`;

    let response = await fetch(endpoint);

    if(response.ok) {
        let { sha, content } = await response.json();
        let result = atob(content);
        return res.json(JSON.parse(result))
    }
    res.json({endpoint})
})

router.get("/test", async (req, res) => {
    let resource = "test.json";
    let endpoint = `${baseUri}${resource}`;

    let payload = {  
        "message": "Add myfile.geojson",
        "content": "eyJ0eXBlIjogIkZlYXR1cmVDb2xsZWN0aW9uIiwgImZlYXR1cmVzIjogW119", 
        "branch": "main"
    }

    let response = fetch( endpoint, {
        method: "PUT",
        headers: {
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

})


export default router;
