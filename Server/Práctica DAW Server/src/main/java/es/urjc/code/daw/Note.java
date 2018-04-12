package es.urjc.code.daw;

import java.sql.Date;

public class Note {

	private long id = -1;
	private String description;
	private Date date;

	public Note() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", description=" + description + ", date=" + date + "]";
	}

}
