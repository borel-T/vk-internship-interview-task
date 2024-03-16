import React, { useState, useEffect } from "react";
import { namesApi } from "../../api";
import { FormItem, Input, Button, Spinner } from "@vkontakte/vkui";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "underscore";

export default function AgeGenerator() {
  //  validation
  const schema = yup.object().shape({
    name: yup.string().matches(/^[a-zA-Z]+$/, "Допускаются только символы"),
  });

  // form-hook
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [cache, setCache] = useState({});

  // watch name-field value
  const nameField = watch("name");
  useEffect(() => {
    // clearing the previous timeout
    clearTimeout(timeoutId);
    // cet a new timeout to call the API after 3 seconds
    const newTimeoutId = setTimeout(async () => {
      if (nameField) {
        await trigger("name"); // Trigger validation for firstName and lastName fields
        // If validation succeeds, submit the form
        handleSubmit(onSubmit)();
      }
    }, 3000);

    // update the timeoutId state
    setTimeoutId(newTimeoutId);
  }, [nameField]);

  // generate name
  const apiCall = (param) => {
    if (!cache[param]) {
      // load
      setIsPending(true);
      // api call
      fetch(`${namesApi.names}?name=${param}`)
        .then((response) => response.json())
        .then((data) => {
          // update
          setAge(data.age ? data.age : 0);
          setCache((prev) => ({ ...prev, [param]: data.age }));
        })
        .catch((error) => console.error("Error fetching age:", error))
        .finally(() => {
          setIsPending(false);
        });
    } else {
      setAge(cache[param]);
    }
  };

  // submit method
  const onSubmit = (data, e) => {
    if (e) e.preventDefault();
    apiCall(data.name);
  };

  return (
    <section className="form-wrap">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormItem top="Текст" htmlFor="name">
          <VkInput
            // value={name}
            name="name"
            {...register("name")}
            // onChange={handleChange}
            placeholder="введите свое имя"
          />
          {errors?.name?.message && (
            <span className="form-error">{errors.name?.message}</span>
          )}
        </FormItem>
        <FormItem>
          {isPending && (
            <Spinner
              color="white"
              size="small"
              style={{ marginRight: "5px" }}
            />
          )}
          {!isPending && (
            <Button className="my-button" type="submit" disabled={!nameField}>
              Угадай свой возраст
            </Button>
          )}
        </FormItem>
      </form>
      {age !== null && <p>прогнозируемый возраст : {age}</p>}
    </section>
  );
}

// vk-inpuot
// Wrap the functional component with React.forwardRef()
const VkInput = React.forwardRef((props, ref) => (
  <Input {...props} getRootRef={ref} />
));
