import Layout from "@/layout";
import style from "./Group.module.css";
import groupData from "../../mocks/groupData.json";
import Button from "@/components/Button/Button";

const Group = () => {

    const findGroup = groupData[0]
    

    return (
        <>
            <Layout title={findGroup.name}>
                <section className={style.group_header_container}>
                    <div className={style.group_header_info_container}>
                        <div className={style.group_header_info_img_btn_container}>
                            <img src={findGroup.image} alt={findGroup.name} />
                            <Button
                                name="participando"
                                variant="gray"
                            />
                        </div>
                        <div className={style.group_header_info_bio_container}>
                            <p>
                                Objeto de GROUP precisa de uma BIO, Objeto de GROUP precisa de uma BIO, Objeto de GROUP precisa de uma BIO
                            </p>
                        </div>
                    </div>

                </section>
            </Layout>
        </>
    )
}

export default Group