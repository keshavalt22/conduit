import { useContext } from "react";
import UserContext from "../utils/UserContext";

function ProfileBanner() {
    let info = useContext(UserContext);
    return (
        <div className="hero">
            <img src={info.data.user.image || "https://www.google.com/imgres?imgurl=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Ftransparent-smiley-face-emoji%2Ftransparent-smiley-face-emoji-14.jpg&tbnid=LuOJWBTBF6el3M&vet=12ahUKEwiR_Ziv3vv9AhXCzXMBHc6_BzcQMygIegUIARDfAQ..i&imgrefurl=http%3A%2F%2Fclipart-library.com%2Ffree%2Ftransparent-smiley-face-emoji.html&docid=pPYRtTlz68Jm8M&w=900&h=900&q=smile%20emoji&hl=en&ved=2ahUKEwiR_Ziv3vv9AhXCzXMBHc6_BzcQMygIegUIARDfAQ"} alt="img" />
            <h2>{info.data.user.username}</h2>
        </div>
    )
}

export default ProfileBanner;