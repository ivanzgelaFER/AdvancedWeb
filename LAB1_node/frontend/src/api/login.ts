import axios from "axios";

export const login = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/protected", {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                });
    console.log(res.data)
};