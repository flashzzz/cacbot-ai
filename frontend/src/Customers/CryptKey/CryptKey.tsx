import React from "react";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomTableCell } from "../../Components/TableComponents/Tablecell";
import { StandardTableActions } from "../../Components/StandardTableActions/StandardTableActions";
import { convertKeyToAsteriks } from "../../helpers/convertKeyToAsteriks";
import { getUniqueId } from "../../helpers";
import AddIcon from "@mui/icons-material/Add";

interface ICryptKey {
  id: string;
  name: string;
  key: string;
  duplicateKey: string;
  isViewKeyVisible: boolean;
}
export const CryptKey: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cryptKey, setCryptKey] = React.useState<ICryptKey[]>([
    {
      id: getUniqueId(),
      name: "Chatbot",
      key: convertKeyToAsteriks("efsfef1sf234fsfesef567ffesf90"),
      duplicateKey: "efsfef1sf234fsfesef567ffesf90",
      isViewKeyVisible: true,
    },
    {
      id: getUniqueId(),
      name: "Chatbot2",
      key: convertKeyToAsteriks("sfef1sf234567ffesf90efsfef1sf2"),
      duplicateKey: "sfef1sf234567ffesf90efsfef1sf2",
      isViewKeyVisible: true,
    },
  ]);

  const handleViewKey = (id: string) => {
    setCryptKey((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isViewKeyVisible: !item.isViewKeyVisible,
            key:
              item.key === item.duplicateKey
                ? convertKeyToAsteriks(item.duplicateKey)
                : item.duplicateKey,
          };
        }
        return item;
      });
    });
  };

  const handleCopyKey = (id: string) => {
    const selectedKey = cryptKey.find((key) => key.id === id);

    if (selectedKey) {
      navigator.clipboard
        .writeText(selectedKey.key)
        .then(() => {
          alert("Key copied to clipboard:");
        })
        .catch(() => {
          alert("Error copying key to clipboard");
        });
    }
  };

  return (
    <PageContainer title="CryptKey" description="crypt key page">
      <StandardCard
        heading="Chatbot application API Keys"
        rightHeading={
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
            Add Key
          </Button>
        }
      >
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgb(205 205 205)",
            color: "white",
            mt: 2,
          }}
        >
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  Key
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptKey.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <CustomTableCell
                      sx={{
                        borderBottom: "1px solid #b5b5b5",
                        fontSize: "1rem",
                        letterSpacing: "0.1rem",
                      }}
                    >
                      {item.name}
                    </CustomTableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #b5b5b5",
                        fontSize: "1rem",
                        letterSpacing: "0.1rem",
                      }}
                    >
                      {item.key}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #b5b5b5",
                        fontSize: "1rem",
                        letterSpacing: "0.1rem",
                      }}
                    >
                      <StandardTableActions
                        onViewKey={() => handleViewKey(item.id)}
                        onCopyKey={() => {
                          handleCopyKey(item.id);
                        }}
                        onDeleteKey={() => {}}
                        onViewKeyBoolean={item.isViewKeyVisible}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </StandardCard>
    </PageContainer>
  );
};
