import React, {FC, useRef, useState} from 'react';
import {Accordion, Dropdown} from "react-bootstrap";
import {IGraduationProjectStage} from "../CourseList/DiplomeElement";
import DiplomeService from "../../../mobx/services/diplom.service";
import s from "./TeacherProjectsCheckking.module.sass";
import EditDiplomeModal from "./EditDiplomeModal";
import EditDiplomeStageModal from "./EditDiplomeStage/EditDiplomeStageModal";



const DiplomeStage: FC<IGraduationProjectStage> = ({id, graduation_project_id, title, description, is_done, deadline_date }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const {current: handleOpenModal} = useRef(() => {
        setIsModalOpen(true)
    })

    const {current: handleCloseModal} = useRef(() => {
        setIsModalOpen(false)
    })

    const handleSetIsDone = () => {
        if (id != undefined){
            DiplomeService.setIsDoneForStage(id).then(data => console.log(data.data))
        }
    }

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey={String(id)}>
                    <Accordion.Header>
                        {title}
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className={s.title_diplome}>
                            <div>
                                <div>{description}</div>
                                <div>СТАТУС: {is_done ? (<>Сделано</>): (<>Не сделано</>)}</div>
                                <div>{deadline_date}</div>
                            </div>
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                                        Настройки стадии
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setIsModalOpen(true)}>Редактировать</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
                                        <Dropdown.Item onClick={handleSetIsDone}>{!is_done ? (<p>Завершить</p>) : (<p>Отменить</p>)}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br/>
            <EditDiplomeStageModal
                isModalOpened={isModalOpen}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                id={id}
                updateStage={{
                    graduation_project_id: graduation_project_id,
                    title: title,
                    description: description,
                    is_done: is_done,
                    deadline_date: new Date(deadline_date)
                }}
            />
        </div>
    );
};

export default DiplomeStage;