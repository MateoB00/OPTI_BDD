import { PrimaryColumn, ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('party_participant_summary', { synchronize: false })
export class PartyParticipantSummary {
  @PrimaryColumn()
  partyId: number;

  @ViewColumn()
  partyName: string;

  @ViewColumn()
  totalParticipants: number;

  @ViewColumn()
  acceptedParticipants: number;

  @ViewColumn()
  pendingParticipants: number;
}

//CREATE MATERIALIZED VIEW party_participant_summary AS
//SELECT
//    p.id AS party_id,
//    p.name AS party_name,
//    COUNT(pa.id) AS total_participants,
//    SUM(CASE WHEN pa.status = 'Accepted' THEN 1 ELSE 0 END) AS accepted_participants,
//    SUM(CASE WHEN pa.status = 'Pending' THEN 1 ELSE 0 END) AS pending_participants
//FROM
//    party p
//LEFT JOIN
//    participant pa ON pa."partyId" = p.id
//GROUP BY
//    p.id;
