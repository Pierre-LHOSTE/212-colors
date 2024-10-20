import { deleteUser, getAllUsers } from "@/src/api/user";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { useModalStore } from "@/src/store/modal";
import { Button, Popconfirm, Space, Table, TableProps, Tag } from "antd";
import { useEffect, useState, useTransition } from "react";
import MainCard from "../../card/MainCard";
import UserModal from "../../modal/user/UserModal";

interface UserType {
  id: string;
  name: string;
  email: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  role: string;
  premium: boolean;
}

export default function UsersTable() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const { LL } = useI18nContext();

  useEffect(() => {
    startTransition(async () => {
      const res = await getAllUsers();
      if (!res || "error" in res) return;
      setUsers(res);
    });
  }, []);

  function handleEdit(user: UserType) {
    setModalState({
      id: "user",
      mode: "edit",
      editItem: user,
      updateStateCallBack: (user: UserType) => {
        setUsers(users.map((u) => (u.id === user.id ? { ...u, ...user } : u)));
      },
    });
  }

  async function handleDelete(user: UserType) {
    const res = await deleteUser(user.id);
    if (!res || "error" in res) return;
    setUsers(users.filter((u) => u.id !== user.id));
  }

  const columns: TableProps<UserType>["columns"] = [
    {
      title: LL.project.color.modal.display.name(),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
      render: (premium) => (
        <Tag color={premium ? "green" : "red"}>{premium ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "cyan"}>{role}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (user) => (
        <Space>
          <Button type="default" onClick={() => handleEdit(user)}>
            {LL.global.button.edit()}
          </Button>
          <Popconfirm
            title={LL.global.button.confirm()}
            okText={LL.global.button.yes()}
            cancelText={LL.global.button.no()}
            onConfirm={() => handleDelete(user)}
          >
            <Button type="primary" danger>
              {LL.global.button.delete()}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <MainCard title={LL.profile.dashboard.users()}>
        <Table
          loading={isPending}
          columns={columns}
          dataSource={users}
          footer={() => (
            <Button
              type="primary"
              onClick={() =>
                setModalState({
                  id: "user",
                  mode: "add",
                  updateStateCallBack: (user: UserType) =>
                    setUsers([...users, user]),
                })
              }
            >
              {LL.profile.dashboard.newUsers()}
            </Button>
          )}
        />
      </MainCard>
      <UserModal />
    </>
  );
}
