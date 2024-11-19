import axios from "axios";
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Loading from "../Loading";
import {
  CALENDAR_BASE_URL,
  REACT_APP_CALENDAR_SCOPES,
} from "../../constants/calendar";
import { CalendarData } from "./CalendarTypes";
import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState(null);

  // Inicializa a API do Google
  useEffect(() => {
    const initializeGapi = () => {
      gapi.load("client:auth2 ", () => {
        gapi.client
          .init({
            apiKey: process.env.REACT_APP_CALENDAR_API_KEY,
            clientId: process.env.REACT_APP_CALENDAR_CLIENT_ID,
            scope: REACT_APP_CALENDAR_SCOPES,
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();

            // Verifica se o usuário já está autenticado
            if (authInstance.isSignedIn.get()) {
              const token = authInstance.currentUser
                .get()
                .getAuthResponse().access_token;
              setAccessToken(token); // Salva o token no estado
              fetchEvents(token);
            } else {
              // Realiza o login automaticamente, sem a necessidade de botão
              authInstance.signIn().then(() => {
                const token = authInstance.currentUser
                  .get()
                  .getAuthResponse().access_token;
                setAccessToken(token); // Salva o token no estado
                fetchEvents(token);
              });
            }
          })
          .catch((error: any) => {
            setError("Erro ao inicializar a API do Google: " + error);
            setLoading(false);
          });
      });
    };

    initializeGapi();
  }, []);

  const fetchEvents = async (token: string | null) => {
    try {
      setLoading(true);
      const now = new Date().toISOString();

      const response = await axios.get(`${CALENDAR_BASE_URL}?timeMin=${now}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.items); // Salva os eventos no estado
      console.log(response.data.items);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }); // Format as h:mm AM/PM
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            className="card_description"
            gutterBottom
            variant="h4"
            component="div"
          >
            Calendar
            <span>Próximos Eventos</span>
          </Typography>

          {loading ? (
            <Loading />
          ) : (
            <List sx={{ bgcolor: "background.paper" }}>
              {events.map((event, index) => (
                <ListItem
                  className="list_description"
                  key={index}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={event.summary}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {formatDate(event.start.dateTime || event.start.date)}{" "}
                          at{" "}
                          {formatTime(event.start.dateTime || event.start.date)}
                        </Typography>
                        {event.location}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          {/* Botão de atualizar */}
          <button
            onClick={() => fetchEvents(accessToken)} // Usa o token armazenado para atualizar
            disabled={loading} // Desabilita o botão enquanto está carregando
          >
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
