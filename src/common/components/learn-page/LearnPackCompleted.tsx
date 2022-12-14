import React, { FC } from "react";
import { CustomGridContainer } from "../CustomGridContainer";
import CardMedia from "@mui/material/CardMedia";
import completed from "assets/images/Checklist.jpg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { to } from "../../navigateRoutes/navigateRoutes";

type PropsType = {
    packId: string
    setNewAttempt: (value: boolean) => void
    tryAgain: () => void
}
export const LearnPackCompleted: FC<PropsType> = ({ packId, setNewAttempt, tryAgain}) => {

    const navigate = useNavigate();

    const tryAgainHandler = () => {
        tryAgain()
        setNewAttempt(true);
        navigate(to.learnPack(packId));
    };

    const backToCardsHandler = () => {
        navigate(to.pack(packId));
    };

    return (
        <CustomGridContainer>
            <CardMedia component="img" src={completed} sx={{ height: "270px" }} />

            <Typography component={"h4"} variant={"h4"}>
                You are done !!!
            </Typography>

            <ButtonGroup>

                <Button onClick={tryAgainHandler}>try again</Button>

                <Button onClick={backToCardsHandler}>Back to cards</Button>

            </ButtonGroup>

        </CustomGridContainer>
    );
};

