import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../component/Editor";
import {setPageTitle } from "../util";

// 커스텀 훅스의 기능 사용 경우는 
// 일반 함수에서 훅스가 안먹는 경우(특히 useNavigate)
// 도 있지만

// 리액트 훅스의 조합으로 내가 필요한 기능을
// "맞춤 커스텀"으로 맞춤함수를 만드는 목적도 있으니
// 참고하여 주시기 바랍니다
// (내가 자주 쓰는 기능을 사전에 함수로 미리 만드는목적)

const Edit = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

    useEffect(() => {
        setPageTitle("수정하기")
      },[]);

    const onSubmit = (data) => {
        if(window.confirm("일기를 진짜 수정할까요?")){
            const {date, content, emotionId} = data;
            onUpdate(id, date, content, emotionId);
            navigate("/", {replace: true});
        }
    }

    const onClickDelete = () => {
        if (window.confirm("일기를 진짜 삭제할까요? 복구되지 않습니다!!")){
            onDelete(id);
            navigate("/", {replace: true});
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    if (!data) {
        return <div>일기를 불러오고있습니다</div>
    }
    else {
        return (<div>
            <Header title={"일기수정하기"}
                leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
                rightChild={<Button type={"negative"} text={"삭제하기"}
                onClick={onClickDelete} />}
            />
            <Editor initData={data} onSubmit={onSubmit}/>
        </div>)
    }
};
export default Edit;