import React from "react";
import { AddNewPack } from "../../common/components/mainContent/AddNewPack";
import { SearchPacksCard } from "../../common/components/mainContent/SearchPackCards";
import { ShowPacksCards } from "../PackList/ShowPacksCards";
import { NumberOfCards } from "../PackList/NumberOfCards";
import { TablePacks } from "../../common/components/mainContent/table/TablePacks";
import { FiltersReset } from "../../common/components/mainContent/filter-controlers/FiltersReset";
import { PacksPageContainer } from "../../common/components/mainContent/table/PacksPageContainer";
import { TableFiltersContainer } from "../../common/components/mainContent/filter-controlers/TableFiltersContainer";
import { useParams, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetPacksQuery } from "./packsApi";
import { IGetPacksResponse } from "./packsSlice";
import { Preloader } from "../../common/components/Preloader";
import { getUrlParams } from "../../common/utils/getUrlParams";
import { PaginationPacksList } from "../../common/components/mainContent/Pagination";


//todo: render optimization

export const CardsPage = () => {
  const [params, setParams] = useSearchParams();

  const paramsObject = getUrlParams(params);

  const { data = {} as IGetPacksResponse, isLoading} = useGetPacksQuery(paramsObject);

  const cardPacks = data?.cardPacks || [];

  const { packId } = useParams();

  const hideTableFilters = !packId;

  return (
    <PacksPageContainer>

      <Box sx={style}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Packs list
        </Typography>

        <AddNewPack />
      </Box>
      {
        isLoading
          ? <Preloader />
          : <><TableFiltersContainer>

            <SearchPacksCard />

            {
              hideTableFilters && <>
                <ShowPacksCards />
                <NumberOfCards data={data} isLoading={isLoading} />
                <FiltersReset setParams={setParams} params={params} />
              </>
            }

          </TableFiltersContainer>

            <TablePacks cardPacks={cardPacks} />

            <PaginationPacksList /></>
      }

    </PacksPageContainer>
  );
};

const style = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};