package es.urjc.code.daw;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notes")
public class NotesController {

	private Map<Long, Note> notes = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Collection<Note> items() {
		return notes.values();
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Note nuevoItem(@RequestBody Note item) {

		long id = lastId.incrementAndGet();
		item.setId(id);
		notes.put(id, item);

		return item;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Note> actulizaItem(@PathVariable long id, @RequestBody Note itemActualizado) {

		Note item = notes.get(id);

		if (item != null) {

			itemActualizado.setId(id);
			notes.put(id, itemActualizado);

			return new ResponseEntity<>(itemActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Note> getItem(@PathVariable long id) {
		
		Note note = notes.get(id);

		if (note != null) {
			return new ResponseEntity<>(note, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Note> borraItem(@PathVariable long id) {
		
		Note note = notes.remove(id);

		if (note != null) {
			return new ResponseEntity<>(note, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
