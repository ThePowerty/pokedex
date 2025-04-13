import { useEffect, useState } from "react";
import "./TypeList.css";
import { pokemonService } from "../../../services/PokemonService";
import superEficaz from "./assets/X2.svg";
import pocoEficaz from "./assets/1-2.svg";
import noAfecta from "./assets/X0.svg";
import { getEffectiveness } from "../../../services/EffectivenessService";

export const TypeList = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await pokemonService.getTypes();
        setTypes(data);
      } catch (err) {
        setError("Error al cargar la tabla de tipos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  if (loading) {
    return <div>Cargando ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="type-list">
      <h1>Tabla de tipos</h1>
      <table>
        <tbody className="table-type">
          <tr>
            <th colSpan={2} rowSpan={2}>
              Efectividad
            </th>
            <th colSpan={18}>Tipo del Pokémon del oponente</th>
          </tr>
          <tr className="vertical-type">
            {types.map((type) => (
              <td className={type.name} key={type.id}>
                <a href="">
                  <p>{type.name}</p>
                </a>
              </td>
            ))}
          </tr>
          <tr>
            <th className="vertical" rowSpan={19}>
              TIPO DEL ATAQUE
            </th>
          </tr>
          {types.map((type) => (
            <tr key={type.id}>
              <td className={type.name}>
                <a href="">
                  <p>{type.name}</p>
                </a>
              </td>
              {types.map((opponentType) => {
                const effectiveness = getEffectiveness(type.name);
                const isStrong = effectiveness.strongAgainst.includes(opponentType.name);
                const isWeak = effectiveness.weakAgainst.includes(opponentType.name);
                const hasNoEffect = effectiveness.noEffect.includes(opponentType.name);

                return (
                  <td key={opponentType.id}>
                    {isStrong && <img src={superEficaz} alt="Super Eficaz" />}
                    {isWeak && <img src={pocoEficaz} alt="Poco Eficaz" />}
                    {hasNoEffect && <img src={noAfecta} alt="No Afecta" />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
