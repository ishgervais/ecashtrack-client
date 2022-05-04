import { useRouter } from "next/router";
import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { Api } from "../pages/api/services/Api";
import { checkLocalStorage } from "../util/checkLocalStorage";
import decodeToken from "../util/decodeToken";
import { EbackendEndpoints, EhttpMethod } from "../types/enums";
import { TUser } from "src/types";
import toast from "react-hot-toast";
export interface IAppProps {
  children?: ReactNode;
}
type DeleteModalProps = {
  item_id?: string;
  model?: string;
};
export interface IAppContext {
  token?: string;
  setToken?: (value: string) => void;
  user?: TUser;
  status?: string;
  message?: string;
  createModal?: boolean;
  modelFormId?: string;
  item_id?: string;
  model?: string;
  assigned_to?: string[];
  // stores
  bookingStore?:any
  bookingDatesStore?:any
  expenseStore?:any
  expenseCategoryStore?:any
  historyLogsStore?:any

  setUser?: (value: TUser) => void;
  toggleCreateModal?: (value: boolean) => void;
  setModelFormId?: (value: any) => void;
  toggleDeleteModal?: (value: DeleteModalProps) => void;
  setBookingStore?: (value: any) => void;
  setBookingDatesStore?: (value: any) => void;
  setExpenseStore?: (value: any) => void;
  setExpenseCategoryStore?: (value: any) => void;
  setHistoryLogsStore?: (value: any) => void;

}

const AppContext = createContext<IAppContext>({});

export function GlobalContext({ children }: IAppProps) {

  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<TUser>();
  const [createModal, toggleCreateModal] = useState<boolean>(false);
  const [modelFormId, setModelFormId] = useState<any>(null);
  const [{ item_id, model }, toggleDeleteModal] = useState<DeleteModalProps>({
    item_id: "",
    model: "",
  });


  // stores

  const [bookingStore, setBookingStore] = useState<any>()
  const [bookingDatesStore, setBookingDatesStore] = useState<any>()
  const [expenseStore, setExpenseStore] = useState<any>()
  const [expenseCategoryStore, setExpenseCategoryStore] = useState<any>()
  const [historyLogsStore, setHistoryLogsStore] = useState<any>()

  const router = useRouter();

  const localToken: string = checkLocalStorage("token");
  let u_id: string = "";
  if (localToken) {
    let tokenPayload: any = decodeToken(localToken);
    u_id = tokenPayload?.id;

    // console.log(tokenPayload)
  }
  // get user info

  useEffect(() => {
    async function loadUser() {
      try{
        if (u_id) {
          const endpoint = EbackendEndpoints.GET_ONE + u_id;
          const response = await new Api().connect(endpoint, EhttpMethod.GET);
          if (response.success === true) {
            setUser(response.data);
          } else toast.error(response.message);
        }
      }catch (err:any) {
        toast.error(err.message)
      }
    }
    if (!user) loadUser();
  }, [localToken, router, u_id, user]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        setUser,
        user,
        createModal,
        toggleCreateModal,
        modelFormId,
        setModelFormId,
        item_id,
        model,
        toggleDeleteModal,
        // stores

        bookingStore,
        bookingDatesStore,
        expenseStore,
        expenseCategoryStore,
        historyLogsStore,

        // mutations
        setBookingStore,
        setBookingDatesStore,
        setExpenseStore,
        setExpenseCategoryStore,
        setHistoryLogsStore
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
