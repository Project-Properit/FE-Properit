import React  from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";


export default function UserSelect() {

    const groupMappings = [{title:'בעל נכס'},{title:'שוכר'},{title:'גם וגם'}];

    return (
        <Autocomplete
            // groupBy={option => groupMappings[option.type]}
            options={groupMappings}
            getOptionLabel={(option) => option.title}
            style={{marginBottom: "10px", width: "100%"}}
            renderInput={params => (
                <TextField
                    {...params}
                    className="item"
                    label="בעל נכס \ שוכר \ גם וגם"
                    variant="outlined"
                />
            )}
        />
    );
}