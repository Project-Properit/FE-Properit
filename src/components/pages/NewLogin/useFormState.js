import { useState, useEffect, useMemo } from "react";
/*
@props :
  { name: {validate: () => {}, default: 1}
  }

all properties of formData are treated as immutable at their respective top-level.
all properties are enumerable ( not functions ) -> read Object.entries for more Info.
no new properties are added after initiation.
 */

export function useFormState(props) {
    const [formData, setFormData] = useState(() => {
        const d = {};
        Object.entries(props).forEach(([key, value]) => {
            d[key] = value.default || null;
        });
        return d;
    });

    const isFormValid = useMemo(() => {
        let state = true;
        Object.keys(formData).forEach(k => {
            const validateFunc = props[k].validate;
            if (validateFunc && !validateFunc(formData[k])) {
                state = false;
            }
        });
        return state;
    }, [props, formData]);

    const onValueUpdate = (name, value) => {
        if (props[name].validate) {
            const status = !props[name].validate(value);
        }
    };

    const wrapSetFormData = newData => {
        setFormData(newData);
        Object.keys(formData).forEach(k => {
            if (formData[k] !== newData[k]) {
                onValueUpdate(k, newData[k]);
            }
        });
    };

    const setFormValue = (name, value) => {
        setFormData({ ...formData, [name]: value });
        if (formData[name] !== value) {
            onValueUpdate(name, value);
        }
    };

    return {
        isFormValid,
        formData,
        setFormData: wrapSetFormData,
        setFormValue,
    };
}