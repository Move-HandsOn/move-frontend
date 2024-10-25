import Layout from "@/layout";
import style from "./Group.module.css";
import groupData from "../../mocks/groupData.json";
import Button from "@/components/Button/Button";
import GroupMenu from "@/components/GroupMenu/GroupMenu";

const Group = () => {

    const findGroup = groupData[0]
    const adm = false

    return (
        <>
            <Layout title={findGroup.name}>
                <section className={style.group_header_container}>
                    <div className={style.group_header_info_container}>
                        <div className={style.group_header_info_img_btn_container}>
                            <img src={findGroup.image} alt={findGroup.name} />
                            <Button
                                name={findGroup.name}
                                variant="gray"
                                symbol={true}
                            />
                        </div>
                        <div className={style.group_header_info_bio_container}>
                            <p>
                                Objeto de GROUP precisa de uma BIO, Objeto de GROUP precisa de uma BIO, Objeto de GROUP precisa de uma BIO
                            </p>
                        </div>
                    </div>
                    <GroupMenu
                        isAdm={adm}
                    />

                </section>
            </Layout>
        </>
    )
}

export default Group